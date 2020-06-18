import {Injectable, OnModuleInit, Logger} from '@nestjs/common';
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
                const monuments = await csv({delimiter: ','}).fromFile(path);

                this.monuments = monuments;
                monuments
                    .forEach(m => m.icon_code = m.tip_patrimoniu.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().replace('PATRIMONIU ', '').replace(/\s+/g, '_'));
                const includedProps = Object.keys(this.monuments[0]);

                this.geoJSON = GeoJSON.parse(this.monuments.filter(m => m.longitudine_x && m.latitudine_y), {
                    Point: ['latitudine_y', 'longitudine_x'],
                    include: includedProps
                });
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

    // return list of images
    async listMonumentImages(monumentPath: string): Promise<any[]> {

        const safePath = monumentPath.replace(/\.\./gi, '');
        console.log(`safePath: ${safePath}`);
        let monumentImages = await glob('**', {cwd: `/tmp/images/${safePath}/`}) || [];

        // if requested item has images
        if (monumentImages.length > 0) {
            // remove thumb items from list of images
            monumentImages = monumentImages.filter(i => i.indexOf('_thumb') === -1);

            // return array of images
            return monumentImages;

        } else {
            // return empty array
            return [];
        }
    }

    // return photo albums
    async listPhotoAlbums(monumentPath: string): Promise<any[]> {

        const safePath = monumentPath.replace(/\.\./gi, '');
        console.log(`safePath: ${safePath}`);
        let monumentImages = await glob('**', {cwd: `/tmp/images/${safePath}/`}) || [];

        // if requested item has images
        if (monumentImages.length > 0) {
            // remove thumb items from list of images
            monumentImages = monumentImages.filter(i => i.indexOf('_thumb') === -1);

            // test for monument sub-components
            const firstItemArr = monumentImages[0].split('_');
            const firstItemArrNew = [
                firstItemArr.slice(0, firstItemArr.length - 3).join(' '),
                firstItemArr[firstItemArr.length - 3],
                firstItemArr[firstItemArr.length - 2],
                firstItemArr[firstItemArr.length - 1],
            ];
            console.log(firstItemArrNew);
            const regex = /\.\w{3,}/;
            const matchFound = firstItemArrNew[0].match(regex);

            // create albums
            const photoAlbums = [];
            const dates = [];
            const sections = [];

            monumentImages.forEach((item) => {
                // console.log(item);
                const nameArr = item.split('_');
                const nameArrNew = [
                    nameArr.slice(0, nameArr.length - 3).join(' '),
                    nameArr[nameArr.length - 3],
                    nameArr[nameArr.length - 2],
                    nameArr[nameArr.length - 1],
                ];
                const date = nameArrNew[1];
                // console.log(date);
                const sectArr = nameArrNew[0].split('.');
                const sectiune = ( sectArr.length > 1 && sectArr[1].length > 2) ? sectArr[1] : 'Ansamblu';
                // console.log(sectiune);

                // ad item to photo albums
                const dateIndex = dates.indexOf(date);
                const sectionIndex = dateIndex > -1 && sections[dateIndex] ? sections[dateIndex].indexOf(sectiune) : -1;
                if (dateIndex > -1) {
                    // console.log('dateIndex: if branch');
                    // photoAlbums[dateIndex].images.push(item);
                    if (sectionIndex > -1) {
                        photoAlbums[dateIndex].sections[sectionIndex].images.push(item);
                    } else {
                        sections[dates.indexOf(date)].push(sectiune);
                        photoAlbums[dateIndex].sections.push({
                            title: sectiune,
                            images: [item],
                        });
                    };
                } else {
                    // console.log('dateIndex: else branch');
                    dates.push(date);
                    sections[dates.indexOf(date)] ? sections[dates.indexOf(date)].push(sectiune) : sections.push([sectiune]);
                    photoAlbums.push({
                        date,
                        sections: [{
                            title: sectiune,
                            images: [item],
                        }],
                    });
                };

            });

            // return array of images
            // console.log('server: ', JSON.stringify(photoAlbums));
            return photoAlbums;

        } else {
            // return empty array
            return [];
        }
    }
}
