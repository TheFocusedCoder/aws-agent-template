/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "executor": {
      "name": string
      "type": "sst.aws.Function"
    }
  }
}
export {}
