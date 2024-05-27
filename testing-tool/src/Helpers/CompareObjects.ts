// SPDX-License-Identifier: Apache-2.0

 
export class CompareObjectsHelper {
    static difference(BaseObject, CompareObject, IgnoreFields: string[]) {
        const changes = {};

        function walkObject(BaseObject, CompareObject, path = '') {
            for (const key of Object.keys(BaseObject)) {
                const currentPath = path === ''
                    ? key
                    : `${path}.${key}`;

                if (CompareObject[key] === undefined) {
                    changes[currentPath] = '-';
                }
            }

            for (const [key, value] of Object.entries(CompareObject)) {
                const currentPath = Array.isArray(CompareObject)
                    ? path + `[${key}]` : path === '' ? key : `${path}.${key}`;

                if (IgnoreFields.filter(ol => ol === currentPath)[0] !== undefined) {
                    console.log("Ignore Fields Found ", IgnoreFields.filter(ol => ol === currentPath)[0]) 
                } else {
                    if (BaseObject[key] === undefined) {
                        changes[currentPath] = '+';
                    }
                    else if (value !== BaseObject[key]) {
                        if (typeof value === 'object' && typeof BaseObject[key] === 'object') {
                            walkObject(BaseObject[key], value, currentPath)
                        }
                        else {
                            changes[currentPath] = "Expected Value :" + BaseObject[key] + " || Received Value :" + CompareObject[key];
                        }
                    }
                }
            }
        }

        walkObject(BaseObject, CompareObject);

        return changes
    }
}