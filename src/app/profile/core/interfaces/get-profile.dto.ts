export interface GetProfileResponseDTO {
  email: string,
  name: string,
  uid: string,
  createdAt: string,
}

export interface GetProfileRawDTO {
  email: { S:string },
  name: { S:string },
  uid: { S:string },
  createdAt: { S:string },
}
