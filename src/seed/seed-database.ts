import { initialData } from "./seed";
import prisma from '../lib/prisma'


async function main() {
    
    // 1. detele previous records
    await prisma.orderAddress.deleteMany();
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    
    await prisma.userAddress.deleteMany();
    await prisma.user.deleteMany();
    await prisma.country.deleteMany();

    await prisma.productImage.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    const { categories, products, users, countries } = initialData;

    // users
    await prisma.user.createMany({
        data: users
    })

    // countries
    await prisma.country.createMany({
        data: countries
    });

    
    // categories
    const categoriesData = categories.map((name) => (
        { name: name.charAt(0).toUpperCase() + name.slice(1) }
    ));

    await prisma.category.createMany({
        data: categoriesData
    });

    const categoriesDB = await prisma.category.findMany()
    
    const categoriesMap = categoriesDB.reduce((map, category) =>{
        map[category.name.toLowerCase()] = category.id

        return map
    }, {} as Record<string,string>)



    // products
    products.forEach( async(product) => {
        const {images, type, ...rest} = product;

        const dbProduct = await prisma.product.create({
            data: {
                ...rest,
                categoryId: categoriesMap[type.toLowerCase()]
            }
        })

        
        // images 
        const imagesData = images.map(image => ({
            url: image,
            productId: dbProduct.id
        }))

        await prisma.productImage.createMany({
            data: imagesData
        })

    });




    console.log('seed executed properly');
}






(() => {
    if(process.env.NODE_ENV === 'production') return;

    main();
})();