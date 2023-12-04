import { Injectable } from '@nestjs/common';
import Client, { Server, Folder } from 'nextcloud-node-client';
import { ICreate, IDelete, IGet } from 'src/types/nextcloudTypes';

@Injectable()
export class NextcloudService {
  private server: Server = new Server({
    basicAuth: {
      password: process.env.NEXTCLOUD_PASSWORD,
      username: process.env.NEXTCLOUD_USERNAME,
    },
    url: process.env.NEXTCLOUD_URL,
  });

  private client = new Client(this.server);

  async upload({ data, fileBaseName, folderName }: ICreate) {
    const folder: Folder = await this.client.createFolder(folderName);
    await folder.createFile(fileBaseName, data);
  }

  async delete({ fileBaseName, folderName }: IDelete) {
    const folder: Folder = await this.client.createFolder(folderName);
    (await folder.getFile(fileBaseName)).delete();
  }

  async getFile({ fileBaseName, folderName }: IGet) {
    const folder: Folder = await this.client.createFolder(folderName);
    return await (await folder.getFile(fileBaseName)).getContent();
  }
}
