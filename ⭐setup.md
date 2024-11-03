### ##### ##### Setup Clerk Authication and Sanity CMS ### #####

2️⃣ Get Started with Clerk 👉 https://go.clerk.com/k0ls6Zb
create new project

npm install @clerk/nextjs --legacy-peer-deps

follow the steps in the cleck setup from the middleware to clerkMiddleware 
or visit
https://clerk.com/docs/quickstarts/nextjs
https://clerk.com/changelog/2024-10-22-clerk-nextjs-v6

after wrapping the layout with the clerck provide we want avoid to apply that wraped layout to the sanity studio
so ensure the structure must be the following 



1️⃣ Get Started with Sanity 👉 https://www.sanity.io/sonny

# to install sanity CMS
create an account in the sanity site and copy the dev cmd
npm create sanity@latest -- --project pawsr1l9 --dataset production --template clean --typescript --output-path studio-ecomerce --legacy-peer-deps 


if you had any unistalled deps err cause the deps version conflict 
NOde npm rely on react 18 but next uses react v19 thats why we use --legacy-peer-deps 
so u need delete 
node_modules package-lock.json
and run 
npm cache clean --force
npm install --legacy-peer-deps

the install the the node pkgs that in the err msg
npm install --legacy-peer-deps @sanity/vision@3 sanity@3 @sanity/image-url@1 styled-components@6 @sanity/icons
npm install next-sanity --legacy-peer-deps

thene  npm run dev
access to 
http://localhost:3000/studio
if u faced an err that concern local variable data set the u need to create a local .envfile 

# and this for the deployement env variable
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_PROJECT_ID="add  here ur project id"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"


# for sanity studio to read
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_PROJECT_ID="add  here ur project id"

# for sanity schema gen type
we need to install sanity typegen cli

https://www.sanity.io/docs/cli
npm install --global sanity@latest

https://www.sanity.io/docs/sanity-typegen
after installation run to start schema generate in the main project folder named
schema.json
sanity schema extract
to generate types in the main root named sanity.types.ts
sanity typegen generate
open file  sanity/schemaTypes/postType.ts to apply that file types on project
 now CTRL+SHIFT+P > typescript version > use workspace version


add another config to the package.json to run that comand that update the studionscema whene we change the schema in our files
in script add 
"typegen":"npx sanity@latest schema extract && npx sanity@latest typegen generate"

then each time u create a groq query file u run to generate the schema type safe 
npm run typegen

example result :
> react-next-sanity-clerk-ecommerce@0.1.0 typegen
> npx sanity@latest schema extract && npx sanity@latest typegen generate        

✅ Extracted schema to C:\Users\LAAGUILI MOHAMED\Downloads\react-next-sanity-clerk-ecommerce\schema.json
✅ Generated TypeScript types for 16 schema types and 1 GROQ queries in 1 files into: ./sanity.types.ts




