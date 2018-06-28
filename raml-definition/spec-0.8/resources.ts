import MetaModel = require("../metamodel")
import Sys = require("./systemTypes")
import Params = require("./parameters")
import Bodies = require("./bodies")
import Common = require("./common")
import Methods=require("./methods")
import Security=require("./security")

export class ResourceBase implements Sys.DeclaresDynamicType<ResourceType> {

    methods:Methods.Method[];
    //FIXME
    $methods=[
        MetaModel.description("Methods that are part of this resource type definition")
    ]

    is:Methods.TraitRef[]
    $is=[
        MetaModel.embeddedInArray(), MetaModel.description("Instantiation of applyed traits")
    ]

    type:ResourceTypeRef
    $type=[
        MetaModel.description("Instantiation of applyed resource type")
    ]
    //TODO FIXME

    securedBy:Security.SecuritySchemeRef[]
    $securedBy=[
        MetaModel.embeddedInArray(),
        MetaModel.allowNull(),
        MetaModel.description("securityScheme may also be applied to a resource by using the securedBy key, which is " +
            "equivalent to applying the securityScheme to all methods that may be declared, explicitly or implicitly, by " +
            "defining the resourceTypes or traits property for that resource. To indicate that the method may be called without " +
            "applying any securityScheme, the method may be annotated with the null securityScheme.")
    ]


    uriParameters:Params.Parameter[]
    $uriParameters=[
        MetaModel.embeddedInMaps(),
        MetaModel.setsContextValue("location",Params.ParameterLocation.URI),
        MetaModel.description("Uri parameters of this resource")
    ]
    //TODO MERGE REUSED STUFF WITH RESOURCE

    displayName: string
    $displayName=[
        MetaModel.description("An alternate, human-friendly name for the resource type")
    ]

    baseUriParameters:Params.Parameter[]
    $baseUriParameters=[
        MetaModel.embeddedInMaps(),
        MetaModel.setsContextValue("fieldOrParam",true),
        MetaModel.setsContextValue("location",Params.ParameterLocation.BURI),
        MetaModel.description("A resource or a method can override a base URI template's values. This is useful to restrict " +
            "or change the default or parameter selection in the base URI. The baseUriParameters property MAY be used to " +
            "override any or all parameters defined at the root level baseUriParameters property, as well as base URI " +
            "parameters not specified at the root level.")
    ]

    description:Sys.MarkdownString
    $description=[
        MetaModel.description("The description attribute describes the intended use or " +
            "meaning of the $self. This value MAY be formatted using Markdown.")
    ]
}

///////////////////
//// Resource
//////////////////

export class Resource extends ResourceBase {
    relativeUri:Sys.RelativeUriString
    $relativeUri=[
        MetaModel.key(),
        MetaModel.startFrom("/"),
        MetaModel.description("Relative URL of this resource from the parent resource")
    ]



    resources:Resource[];
    $resources=[
        MetaModel.newInstanceName("New Resource"),
        MetaModel.description("Children resources")
    ]


}


///////////////////
//// Resource Type
//////////////////

export class ResourceTypeRef extends Sys.Reference<ResourceType> {
    resourceType:ResourceType
    $resourceType=[
        MetaModel.customHandling(),
        MetaModel.description("Returns referenced resource type")
    ]
}

export class ResourceType extends ResourceBase implements Sys.DeclaresDynamicType<ResourceType> {


    name:string
    $name=[
        MetaModel.key(),
        MetaModel.description("Name of the resource type")
    ]

    usage:string
    $usage=[
        MetaModel.description("Instructions on how and when the resource type should be used.")
    ]

    parameters: string[]
    $parameters = [ MetaModel.hideFromUI() ]
}


