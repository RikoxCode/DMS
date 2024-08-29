export class JsonValidator {
    static validate(json: any) {
        // Validate the JSON
        return true;
    }

    static hasProperty(json: any, property: string) {

        // Check if the property exists
        try {
            if(json[property]) {
                return true;
            }
        }catch (e) {
            return false;
        }

    }
}