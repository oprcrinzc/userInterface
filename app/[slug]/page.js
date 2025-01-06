import "./style.css"
import Card from "../components/card"
import WaterFill from "../components/waterFill"
import Fetch from "../components/fa"

export default async function Page({params}){
    const slug = (await params).slug
    return <div className="dashboard" id="f">
        

        <div className="left">
            <Card role="title"><h1>{slug}</h1></Card>
            <Card role="btn" type="danger" href={`/`}>
                <h1>กลับไปหน้าแรก</h1>
            </Card>
        </div>


        <div className="center">
            <Card role="data">
                <h1>อุณหภูมิ</h1>
                <div className="twoBIG">
                    <Fetch mode="temperature" who={slug} />
                    <p>°C</p>
                </div>
            </Card>
            <Card role="data">
                <h1>ความชื้น</h1>
                <div className="twoBIG card_data">
                    <Fetch mode="humidity" who={slug} />
                    <p>%</p>
                </div>
            </Card>
            <Card role="data">
                <h1>ระดับน้ำ</h1>
                <div className="twoBIG card_data">
                    <Fetch mode="waterlevel" who={slug} />
                    <p>%</p>
                </div>
            </Card>
            <Fetch mode="updateWater" who={slug}/>
        </div>


        {/* <div className="center graph">
            <Card role="data">
                <h1>กราฟ</h1>
                <div className="twoBIG">
                    <Fetch mode="temperature" who={slug} />
                    <p>°C</p>
                </div>
            </Card>
        </div> */}
        
        {/* <div className="right">
            <Card role="data">
                <h1>werwer</h1>
            </Card>
        </div> */}
    </div>
}