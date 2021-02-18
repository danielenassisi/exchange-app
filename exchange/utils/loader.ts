import { load, loadSync, PackageDefinition } from "@grpc/proto-loader";
import { loadPackageDefinition } from "@grpc/grpc-js"

export default function(filename: string, servicename: string) {
  let packageDef: PackageDefinition;
  try {
    packageDef = loadSync(filename);
  } catch(e) {
    console.log(e);
    return null;
  }

  return loadPackageDefinition(packageDef)[servicename];
}