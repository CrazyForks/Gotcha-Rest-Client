import SwaggerDataType
    from '@/export/swagger/SwaggerDataType'

class Items {
    constructor(jsonStruct, definitions) {
        if (jsonStruct.isStructType) {
            this['$ref'] = "#/components/schemas/" + jsonStruct.fieldTypeName

            return
        }

        if (jsonStruct.isEnumType) {
            this.type = SwaggerDataType.string

            this.enum = jsonStruct.children.map(child => {
                return child.fieldName
            })

            return
        }

        if (jsonStruct.isMapType) {
            // TODO
        }

        // enum

        this.type = jsonStruct.swaggerDataType

        jsonStruct.swaggerDataFormat && (this.format = jsonStruct.swaggerDataFormat)

        // TODO swaggerDataType 兼容OpenAPI

        if (this.type === SwaggerDataType.array) {
            this.items = new Items(jsonStruct.children[0], definitions)
        }
    }
}

export default Items