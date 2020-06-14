import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import * as csv from 'csvtojson';
import * as fs from 'fs';
import * as GeoJSON from 'geojson';
import * as glob from 'glob-promise';

@Injectable()
export class MonumentsService implements OnModuleInit {
  private readonly logger = new Logger(MonumentsService.name);
  private monuments = [];
  private geoJSON = {
    type: '',
    features: [],
  };

  async onModuleInit() {

    try {
      const path = `${__dirname}/../data/monuments_cj.csv`;
      if (fs.existsSync(path)) {
        const monuments = await csv({ delimiter: ',' }).fromFile(path);

        this.monuments = monuments;
        monuments
        .forEach(m => m.icon_code = m.tip_patrimoniu.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace('PATRIMONIU ', '').replace(/\s+/g, '_'));
        const includedProps = Object.keys(this.monuments[0]);

        this.geoJSON = GeoJSON.parse(this.monuments.filter(m => m.longitudine_x && m.latitudine_y), { Point: ['latitudine_y', 'longitudine_x'], include: includedProps });
        // console.log(this.geoJSON);

      } else {
        this.logger.debug(`???? ${path}, ${__dirname}`);
      }
    } catch (err) {
      this.logger.error(err);
    }

  }
  findAll(): any {
    return this.monuments;
  }

  getGeoJSON(): any {
    return this.geoJSON;
  }

  getMonumentTypes(prop): any {
    const monumentTypes = {};
    this.geoJSON.features.map(f => {
      monumentTypes[f.properties[prop]] = monumentTypes[f.properties[prop]] || 0;
      monumentTypes[f.properties[prop]]++;
    });
    return monumentTypes;
  }

  async listMonumentImages(monumentPath: string): Promise<string[]> {

    const safePath = monumentPath.replace(/\.\./gi, '');
    console.log(`safePath: ${safePath}`);
    const monumentImages = await glob('**', { cwd: `/tmp/images/${safePath}/` });
    return monumentImages || [];
  }
}
