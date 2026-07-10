import axios from 'axios'
import { getHealthRouteInfo } from '../../shared/health/health.js'


export async function getGatewayHealth(PORT) {

    // Gateway itself doesn't use mongoose
    const gatewayHealth = await getHealthRouteInfo(PORT);

    const services = [
        {
            name: "AUTH_SERVICE",
            url: `${process.env.AUTH_SERVICE_URI}/health`
        },
        {
            name: "CHAT_SERVICE",
            url: `${process.env.CHAT_SERVICE_URI}/health`
        }
    ];

    const results = await Promise.allSettled(
        services.map(service =>
            axios.get(service.url)
        )
    );

    const response = {
        GATEWAY: gatewayHealth,
        SERVICES: {}
    };

    results.forEach((result, index) => {

        const service = services[index];

        if (result.status === "fulfilled") {

            response.SERVICES[service.name] = result.value.data;

        } else {

            response.SERVICES[service.name] = {
                status: "DOWN",
                error: result.reason.message
            };

        }

    });

    response.status = results.every(r => r.status === "fulfilled")
        ? "UP"
        : "DEGRADED";

    return response;
}