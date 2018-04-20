import  MetaModel = require("../../raml-definition/metamodel")
import  Sys = require("./systemTypes")
import  core=require("./core")
import  swagger=require("./swagger")
import  extensions=require("./extensions")
import  defs=require("./definitions")
export class PathsObject extends  extensions.WithSpecificationExtensions{

    paths:PathItemObject[]
}

export class PathItemObject{
    path:string;
    $path=[MetaModel.key(),MetaModel.startFrom("/"),MetaModel.description("A relative path to an individual endpoint. The field name MUST begin with a slash. The path is appended to the basePath in order to construct the full URL. Path templating is allowed.")]

    operations:OperationObject[];

    parameters:ParameterObject[]
    $parameters=[MetaModel.embeddedInMaps(), MetaModel.description("A list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a name and location. The list can use the Reference Object to link to parameters that are defined at the Swagger Object's parameters. There can be one 'body' parameter at most.")]

}


export class ItemsObject extends extensions.WithSpecificationExtensions{
    type:string;
    $type=[
        MetaModel.descriminatingProperty(),MetaModel.oneOf(["string","number","integer","boolean","array","file","object"]),
        MetaModel.description('Required. The type of the parameter. Since the parameter is not located at the request body, it is limited to simple types (that is, not an object). The value MUST be one of "string", "number", "integer", "boolean", "array" or "file". If type is "file", the consumes MUST be either "multipart/form-data" or " application/x-www-form-urlencoded" and the parameter MUST be in "formData".')]

    format:string;

    items:ItemsObject

    collectionFormat:string
    $collectionFormat=[MetaModel.oneOf(["csv","ssv","tsv","pipes","multi"])]

    default:any

    maximum:number
    exclusiveMaximum:boolean
    minimum:number
    exclusiveMinimum:boolean

    maxLength:number
    minLength:number
    pattern:string
    maxItems:number
    minItems:number
    uniqueItems:boolean
    enum:string[]
    multipleOf:number
}

export class ParameterObject extends extensions.WithSpecificationExtensions {

    '$ref':string

    description:Sys.MarkdownString;
    $description=[MetaModel.description("A brief description. This could contain examples of use. GFM syntax can be used for rich text representation.")]

    name:string;
    $name=[MetaModel.required(),MetaModel.description(`Required. The name of the parameter. Parameter names are case sensitive.
If in is "path", the name field MUST correspond to the associated path segment from the path field in the Paths Object. See Path Templating for further information.
For all other cases, the name corresponds to the parameter name used based on the in property.`)]

    'in':string


    required:boolean;
    $required=[MetaModel.description("Determines whether this parameter is mandatory. If the parameter is in 'path', this property is required and its value MUST be true. Otherwise, the property MAY be included and its default value is false.")]

}

export class BodyParameterObject extends  ParameterObject {

    schema: SchemaObject

    'in':string
    $in=[MetaModel.required(),MetaModel.oneOf(["body"]),MetaModel.description('The location of the parameter. Possible values are "query", "header", "path", "formData" or "body".')]

    type:string;
    $type=[
        MetaModel.descriminatingProperty(),MetaModel.oneOf(["string","number","integer","boolean","array","file","object"]),
        MetaModel.description('Required. The type of the parameter. Since the parameter is not located at the request body, it is limited to simple types (that is, not an object). The value MUST be one of "string", "number", "integer", "boolean", "array" or "file". If type is "file", the consumes MUST be either "multipart/form-data" or " application/x-www-form-urlencoded" and the parameter MUST be in "formData".')]



}

export class CommonParameterObject extends  ParameterObject {

    $ = [ MetaModel.superclasses(["ItemsObject"]) ]

    $in=[MetaModel.required(),MetaModel.oneOf(["query", "header", "path", "formData"]),MetaModel.description('The location of the parameter. Possible values are "query", "header", "path", "formData" or "body".')]

    allowEmptyValue:boolean
    example: string
    $example = [MetaModel.example()]
}

export class pointer extends Sys.ValueType{

}
export class SchemaObject extends ItemsObject{
    '$ref':string

    title: string
    description: Sys.MarkdownString
    required: string[]
    $required=[/*MetaModel.selector("*.ItemsObject")*/]

    properties:defs.DefinitionObject[];
    $properties = [ MetaModel.embeddedInMaps() ]

    allOf:SchemaObject[]
    $allOf=[]
    additionalProperties:boolean

    additionalPropertiesSchema: SchemaObject
    $additionalPropertiesSchema = [MetaModel.hideFromUI()]
    items:SchemaObject

    discriminator: string
    $discriminator=[/*MetaModel.selector("*.ItemsObject")*/]
    readOnly: boolean
    xml: XMLObject
    externalDocs: core.ExternalDocumentationObject[]


    type="object"

    example: any
    $example = [MetaModel.example()]

    $=[MetaModel.definingPropertyIsEnough("properties")]
}

export class ArrayObject extends ItemsObject{
    items:ItemsObject
    type="array"
}

export class HeaderObject extends ItemsObject{
    name:string;
    $name=[MetaModel.key()];

    description: Sys.MarkdownString
}

export class Example{

    mimeType:string;
    $mimeType = [MetaModel.key()];

    value: any
}



export class ResponsesObject extends extensions.WithSpecificationExtensions{
    default: ResponseObject
    responses: Response[]
}
export class ResponseObject extends extensions.WithSpecificationExtensions{

    '$ref':string
    
    description:Sys.MarkdownString
    schema:SchemaObject

    headers:HeaderObject[]

    example:Example[]
    $example = [ MetaModel.embeddedInMaps() ]
}


export class Response extends ResponseObject {
    code: string
    $code = [MetaModel.key(), MetaModel.required()]
}

export class OperationObject extends extensions.WithSpecificationExtensions{

    method:string
    $method=[MetaModel.key(),MetaModel.oneOf(["get","put","delete","post","options","head","patch"]),MetaModel.description("key of the operation")]

    parameters:ParameterObject[]
    $parameters=[MetaModel.description("A list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a name and location. The list can use the Reference Object to link to parameters that are defined at the Swagger Object's parameters. There can be one 'body' parameter at most.")]

    tags:string[]
    $tags=[MetaModel.description("A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.")]

    summary:string;
    $summary=[MetaModel.description("A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier.")]

    description:Sys.MarkdownString;
    $description=[MetaModel.description("A verbose explanation of the operation behavior. GFM syntax can be used for rich text representation.")]

    externalDocs:core.ExternalDocumentationObject;


    operationId:string;
    $operationId=[MetaModel.description("Unique string used to identify the operation. The id MUST be unique among all operations described in the API. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is recommended to follow common programming naming conventions.")]

    consumes:string[]
    $consumes=[MetaModel.description("A list of MIME types the operation can consume. This overrides the consumes definition at the Swagger Object. An empty value MAY be used to clear the global definition. Value MUST be as described under Mime Types.")]

    produces:string[];
    $produces=[MetaModel.description("A list of MIME types the operation can produce. This overrides the produces definition at the Swagger Object. An empty value MAY be used to clear the global definition. Value MUST be as described under Mime Types.")]

    responses:ResponsesObject;
    $responses=[MetaModel.description("The list of possible responses as they are returned from executing this operation."),MetaModel.required()]

    schemes:string[]
    $schemes=[MetaModel.oneOf(["http","https","ws","wss"]),MetaModel.description('The transfer protocol for the operation. Values MUST be from the list: "http", "https", "ws", "wss". The value overrides the Swagger Object schemes definition.')]

    deprecated:boolean
    $deprecated=[MetaModel.description("Declares this operation to be deprecated. Usage of the declared operation should be refrained. Default value is false.")]

    security:swagger.SecurityRequirementObject[]
    $security = [MetaModel.embeddedInArray()]
    //FIXME
}

export class XMLObject extends extensions.WithSpecificationExtensions{
    attribute:	boolean
    $attribute=[MetaModel.description("If attribute is set to true, a type instance should be serialized as an XML attribute. It can only be true for scalar types.")]

    wrapped:boolean
    $wrapped=[MetaModel.description('If wrapped is set to true, a type instance should be wrapped in its own XML element. It can not be true for scalar types and it can not be true at the same moment when attribute is true.')]

    name:	string
    $name=[MetaModel.description("Allows to override the name of the XML element or XML attribute in it's XML representation.")]

    namespace: string
    $namespace=[MetaModel.description("Allows to configure the name of the XML namespace.")]
    prefix: string
    $prefix=[MetaModel.description("Allows to configure the prefix which will be used during serialization to XML.")]

}