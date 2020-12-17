import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  Post,
  Put,
  Logger,
} from '@nestjs/common';
import { MonumentsService } from './monuments.service';

@Controller()
export class MonumentsController {
  private readonly logger = new Logger(MonumentsService.name);
  constructor(private readonly monumentsService: MonumentsService) {}
  @Get('/api/monuments')
  async findAll(): Promise<any> {
    return this.monumentsService.findAll();
  }
  @Get('/api/monuments.geojson')
  async getGeoJSON(): Promise<any> {
    return this.monumentsService.getGeoJSON();
  }
  @Get('/api/polygons.geojson')
  async getPolygonsGeoJSON(): Promise<any> {
    return this.monumentsService.getPolygonsGeoJSON();
  }
  @Get('/api/monuments.groups')
  async getMonumentTypes(@Query('prop') monumentProperty): Promise<any> {
    monumentProperty = monumentProperty || 'tip_patrimoniu';
    return this.monumentsService.getMonumentTypes(monumentProperty);
  }
  @Get('/api/monument.images')
  async listMonumentImages( @Query('monumentPath') monumentPath): Promise<any> {
    if (!monumentPath) { return []; }
    return await this.monumentsService.listMonumentImages(monumentPath);
  }
  @Get('/api/monument.photoalbums')
  async listPhotoAlbums( @Query('monumentPath') monumentPath): Promise<any> {
    if (!monumentPath) { return []; }
    return await this.monumentsService.listPhotoAlbums(monumentPath);
  }
}
