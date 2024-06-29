import { useEffect, useState } from "react";
import { Carousel, Row } from "react-bootstrap";
export default function Dummy({list}) {
  let [data , setData] = useState()
  // let Movdata = [
  //   { title: "Dark", movie: [] },
  //   { title: "Comedy", movie: [] },
  //   { title: "Tv Show", movie: [] },
  //   { title: "Crime", movie: [] },
  // ];
  // let data = Mdata;
  useEffect(() => {
    fetch('http://127.0.0.1:3000/content', 
    { method : "GET"}).then((response) => 
      response.json().then((e) => {
        setData(e)
        console.log(e)
      })
    )
  
  }, []);

  return <div>
                <Row>
              <h5 style={{ color: "white" }}>Drugs</h5>

              <Carousel
                showIndicators={false}
                showStatus={false}
                showThumbs={false}
                centerSlidePercentage={15}
                centerMode
              >
                {data.map((e) => {
                  
                  return(
                    <>
                  <h1>{e.name}
                  </h1>
                </>  
                )
                })}
              </Carousel>
              </Row>
  </div>;
}
