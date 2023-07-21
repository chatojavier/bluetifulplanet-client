
# BluetifulPlanet Client

This is the repository for the BluetifulPlanet client. It is a private repository and version 0.1.0.

## Scripts
The following scripts are available for this project: 
* `dev`: Runs the Next dev command. 
* `build`: Runs the Next build command. 
* `start`: Runs the Next start command. 
* `lint`: Runs the Next lint command. 
* `dev:turbo`: Runs the Next dev command with turbo option enabled. 
* `test`: Runs Jest with watchAll set to false and transformIgnorePatterns set to "node_modules/(?!swiper)/". 
* `test:coverage`: Runs Jest with coverage enabled and transformIgnorePatterns set to "node_modules/(?!swiper)/". 
* `compile`: Compiles GraphQL codegen using env-cmd -f .env.local. 
* `watch`: Watches GraphQL codegen using env-cmd -f .env.local -w. 
* `prepare`: Installs Husky dependencies. 
* `export`: Exports Next files for production use.  

 ## Dependencies & DevDependencies  

 This project uses a variety of dependencies and devDependencies, including but not limited to @apollo/client, @fortawesome/fontawesome-svg-core, graphql, lodash, react, swiper, typescript, @graphql-codegen/cli, eslint, husky, jest, postcss, prettier and tailwindcss. Please refer to package.json for more information about these dependencies and their versions used in this project.