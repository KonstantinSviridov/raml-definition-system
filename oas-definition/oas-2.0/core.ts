import  MetaModel = require("../../raml-definition/metamodel")
import  Sys = require("./systemTypes")
import  extensions=require("./extensions")

export class ExternalDocumentationObject extends extensions.WithSpecificationExtensions{
    description:string
    $description=[MetaModel.description("A short description of the target documentation. GFM syntax can be used for rich text representation.")]


    url:string
    $url=[MetaModel.required(),MetaModel.description("The URL for the target documentation. Value MUST be in the format of a URL.")];
}