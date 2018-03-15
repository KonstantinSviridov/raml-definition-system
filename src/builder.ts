import fs=require("fs");
import path=require("path")
import tsstruct=require("ts-structure-parser")
var locations = {

    "RAML10" : "./spec-1.0/api.ts",

    "RAML08" : "./spec-0.8/api.ts",

    "OAS20" : "./oas-2.0/swagger.ts"

};

function getDecl(key:string,defPath:string){



    var tsPath=path.resolve(defPath,locations[key]);
    var decls=fs.readFileSync(tsPath).toString();
    var src=tsstruct.parseStruct(decls,{},tsPath);
    var arr = toModulesCollection(src);

    var jsonPath = path.resolve(path.resolve(path.dirname(tsPath),'../../dist/'),key+'.json');
    console.log(jsonPath)
    fs.writeFileSync(jsonPath, JSON.stringify(arr, null, 2));


}

function toModulesCollection(mod:any, map:any={},arr:any[]=[]):any[]{

    var name = mod['name'];
    if(map[name]){
        return;
    }
    map[name] = mod;
    arr.push(mod);
    var imports = mod['imports'];
    Object.keys(imports).forEach(x=>{

        var submod = imports[x];
        var n = submod['name'];
        imports[x] = n;
        toModulesCollection(submod,map,arr);
    });
    return arr;
}

var ramlPath = path.resolve(__dirname,"../raml-definition/");
var oasPath = path.resolve(__dirname,"../oas-definition/")
getDecl("RAML08",ramlPath);
getDecl("RAML10",ramlPath);
getDecl("OAS20",oasPath);