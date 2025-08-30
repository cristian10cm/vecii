export interface typeStore {
    
            createdAt: string | Date,
            id: string,
            name: string,
            location: {
                type: string,
                coordinates: [
                    number,
                    number
                ]
            }
        
}