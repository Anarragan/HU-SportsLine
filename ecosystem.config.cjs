module.exports = {
    apps: [
        {
            name: "sportsline-app",     // Nombre del proceso PM2
            script: "./dist/server.js", // Tu punto de entrada compilado
            instances: 1,           // Usa todos los núcleos disponibles o solo 1 para desarrollo
            exec_mode: "fork",       // Cluster mode para producción o fork para desarrollo
            watch: false,
            
            env: {
                NODE_ENV: "production",
                PORT: 3002
            }
        }
    ]
};