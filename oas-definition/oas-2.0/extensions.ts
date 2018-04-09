import  MetaModel = require("../../raml-definition/metamodel")

export class WithSpecificationExtensions {

    specificationExtensions: SpecificationExtension[]

}

export class SpecificationExtension {

    name:string
    $name = [ MetaModel.key() ]

    value:string
    $value = [ MetaModel.value() ]

}