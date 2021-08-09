/*const {MongoClient} = require('mongodb');


async function main(){
   
    const uri = "mongodb+srv://devops:Contraseña123@cluster0.evlx3.mongodb.net/<dbname>?retryWrites=true&w=majority";
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    try {        
        await client.connect();              
        await  listProducts(client, nameOfListing);
    } catch (e) {
        console.error(e);
    } finally {
        
        await client.close();
    }
}
main().catch(console.error);


async function listDatabases(client, ){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    console.log()
    
};
var nameOfListing = "Holly";
async function findOneListingByName(client, nameOfListing) {
    
    const result = await client.db("Test").collection("Pets")
                        .findOne({ name: nameOfListing });
    if (result) {
        console.log('Found a listing in the collection with the name '  + nameOfListing);
        console.log(result);
    } else {
        console.log('No listings found with the name '+nameOfListing);
    }
}



async function listCollec(client){
    const result = await client.db("Test").listCollections().toArray();
       
    console.log(result);  
    
};

async function listProducts(client){
    const result = await client.db("Test").collection("Products").find().toArray();
    return result;    
    //console.log(result);  
    
};

export  {listProducts};*/