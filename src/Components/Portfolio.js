import React, { Component } from "react";
import Zmage from "react-zmage";
import Fade from "react-reveal";
import { Web3Storage } from 'web3.storage'

let id = 0;
const client = new Web3Storage({token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEY1NDA5NDM1NjczMkVBNjJhNjRkN0U0NzUwYjlGZTQ2NGRlMTU4ODQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NTk3NzkwNTkxNDcsIm5hbWUiOiJoYWNrYXRob24ifQ.wnScxQzZsMgwX5OLapPylm333dyFYn2D-DAM8xgdkJ8"});
const Portfolio = ()=>{

  const [image,setImage] = React.useState();
  const [changed,setChanged] = React.useState(false);
  const [filename, setfilename] = React.useState("");

  async function handleUpload(e){
    e.preventDefault();
    if(e.target.files[0]){const file = e.target.files;
    console.log(file);
    const rootCid = await client.put(file);
    setImage(rootCid);
    console.log(rootCid);}
    // const reader = new FileReader();
    // reader.readAsDataURL(file[0]);
    // reader.onload = async function(){
    //   const rootCid = await client.put(file);
    //   console.log(rootCid);
    // }

  }
// bafybeifhxvv5tanniywwswysnuyhefnsmcx2eco37zpkng7olwo7tdme7m
  async function handleRetrieve(e){
    setChanged(false);
    e.preventDefault();
    try{if(e.target.value.length > 0){
      const cID = e.target.value;
    const res = await client.get(cID)
    console.log(`Got a response! [${res.status}] ${res.statusText}`)
    if (!res.ok) {
      throw new Error(`failed to get ${cID} - [${res.status}] ${res.statusText}`)
    }
    setChanged(true);
    console.log(res);
    // setImage(cID);
  
    // unpack File objects from the response

    const files = await res.files()
    for (const file of files) {
      console.log(file)
      //setImage(URL.createObjectURL(file));
      setfilename(file.name)
      console.log(URL.createObjectURL(file))
      // console.log(`${file.cID} -- ${file.path} -- ${file.size}`)
    }
    }}catch(err){
      console.log(err);
    }
  }

  
  return (
      <section id="portfolio">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div style={{display:"flex"}} className="twelve columns collapsed">
              <div
                id="portfolio-wrapper"
                className="bgrid-quarters s-bgrid-thirds cf"
                >
                <h1>UPLOAD FILES HERE</h1>
                <input onChange={handleUpload} type="file" />
                {image && <p>{image}</p>}
              </div>
              <div
                id="portfolio-wrapper"
                className="bgrid-quarters s-bgrid-thirds cf"
                >
                <h1>PASTE CID HERE</h1>
                <input onChange={handleRetrieve} type="text" />
                {changed && <a href={`https://${image}.ipfs.dweb.link/${filename}`} download>{filename} </a>}
              </div>
            </div>
          </div>
        </Fade>
      </section>
      
      );
}

export default Portfolio;
