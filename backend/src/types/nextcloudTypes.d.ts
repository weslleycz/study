export type ICreate = {
  fileBaseName: string;
  data: Buffer;
  folderName: string;
};

export type IDelete = {
  fileBaseName: string;
  folderName: string;
};

export type IGet = {
  fileBaseName: string;
  folderName: string;
};
