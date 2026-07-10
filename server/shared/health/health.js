import os from 'node:os'
import process from 'node:process'
import si from 'systeminformation'

export const formatUptime = () => {
        const totalSeconds = Math.floor(process.uptime());

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

export async function getHealthRouteInfo(PORT,mongoose=null)
{
    try {
        const dbStatus = {
            0: "Disconnected",
            1: "Connected",
            2: "Connecting",
            3: "Disconnecting"
        };
        const [cpuinfo, systeminfo, osInfo, currentLoad] = await Promise.all([
            si.cpu(),
            si.system(),
            si.osInfo(),
            si.currentLoad()
        ]);
      return {
                status:"Running",
                PORT,
                Database:mongoose==null ? "null" :dbStatus[mongoose.connection.readyState],
                uptime:formatUptime(),
                Info:{
                    cpu:{
                        cpu_cores: os.cpus().length, 
                        currentLoad: currentLoad.currentLoad.toFixed(2) + "%"
                    },
                    OS:{
                        platform:osInfo.platform,
                        distro:osInfo.distro,
                    }
                }
        }
        
    } 
    catch (error) {
        console.log(error);
       return {
        message:"Something Went Wrong "
       } 
    }
}