
import { Button } from "react-bootstrap";
import { SiVisa } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa6";
import { IconContext } from "react-icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function Changepayment() {
  const [cnolabel , setCnolebel] = useState(false)
  const loction = useLocation()
  const navigate = useNavigate()
  let mail = loction.state.user.email;
  console.log(loction.state)
  const handleSubmit = (e) => {
    e.preventDefault()
    let card = {name : e.target.cname.value, cardnumber : e.target.cno.value , exdate :e.target.cdate.value , cvv :e.target.cvv.value}
    fetch('http://127.0.0.1:3000/changepay', 
    { method : "post" ,headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email : mail , card : card})})
    navigate("/managepayment" , {state:loction.state})
  }

  return (
    <>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "150px",
        }}
      >
        <div className="mt-5" style={{ width: "500px" }}>
          <p className="mt-5" style={{ fontSize: "13px" }}>
            STEP <b>3</b> OF <b>3</b>
          </p>
          <h2>Set up your credit or debit card</h2>
          <div className="row" style={{width:"117px"}}>
            <div className="col">
            <IconContext.Provider value={{size:"2em"}}>
            <FaCcMastercard />
            </IconContext.Provider>
            </div>
            <div className="col">
            <IconContext.Provider value={{size:"2em"}}>
            <SiVisa />
            </IconContext.Provider>
              </div>
          </div>
          <form onSubmit={handleSubmit}>
            <input type="number" placeholder="Card Number" name="cno" style={{width:"100%" , height:"8vh"}} required/>
           {cnolabel ? (<label className="text-danger" name="lableno">Card number must be more then 15 digits</label>) : (<></>)}  
            <div className="row mt-2">
              <div className="col"><input type="text" name="cdate" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} placeholder="Expiration Date" style={{width:"100%" , height:"8vh"}} required/></div>
              <div className="col"><input type="password"  name="cvv"  placeholder="CVV" style={{width:"100%" , height:"8vh"}} required/></div>
            </div>
            <input type="text" className="mt-2" name="cname" placeholder="Name on Card "  style={{width:"100%" , height:"8vh"}} required/>
            <Button
            type="submit"
              style={{
                width: "100%",
                marginTop: "20px",
                height: "60px",
                backgroundColor: "red",
                fontSize: "20px",
              }}
             
            >
              Change Payment Method
            </Button>
          </form>
        </div>
      </div>
  
    </>
  );
}
