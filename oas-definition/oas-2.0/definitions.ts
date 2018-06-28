import  MetaModel = require("../../raml-definition/metamodel")
import  Sys = require("./systemTypes")
import paths=require('./paths')
import  extensions=require("./extensions")
export class DefinitionObject extends paths.SchemaObject{

    name:string;
    $name=[MetaModel.key()];
}

export class ParameterDefinitionObject extends paths.ParameterObject{

    key:string;
    $key=[MetaModel.key()];
}

export class CommonParameterDefinitionObject extends paths.CommonParameterObject{

    $ = [MetaModel.superclasses(["ParameterDefinitionObject"])];
}

export class BodyParameterDefinitionObject extends paths.BodyParameterObject{

    $ = [MetaModel.superclasses(["ParameterDefinitionObject"])];
}

export class ResponseDefinitionObject extends paths.ResponseObject{
    key:string;
    $key=[MetaModel.key()];

}

export class SecurityDefinitionObject extends extensions.WithSpecificationExtensions{

    name:string;
    $name=[MetaModel.key()];

    type:string;
    $type=[MetaModel.oneOf(["basic","apiKey","oauth2"]),MetaModel.descriminatingProperty()];

    description:Sys.MarkdownString;
}

export class ApiKey extends SecurityDefinitionObject{
    name:string;
    $name=[MetaModel.required()];

    'in':string;
    $in=[MetaModel.oneOf(['query',"header"]),MetaModel.required()];

    type='apiKey'
}
export class OAuth2 extends  SecurityDefinitionObject{
    flow:string;
    $flow=[MetaModel.required(),MetaModel.oneOf(["implicit","password","application","accessCode"])];

    authorizationUrl:string//TODO GUARDS
    tokenUrl:string;
    scopes:ScopesObject;

    type="oauth2"
}

export class Basic extends SecurityDefinitionObject{
    type="basic"
}
export class ScopesObject extends extensions.WithSpecificationExtensions{
    scopes: ScopeObject[]
}
export class ScopeObject{
    name:string;
    $name=[MetaModel.key()];
    description:string;
    $value=[MetaModel.value()];
}