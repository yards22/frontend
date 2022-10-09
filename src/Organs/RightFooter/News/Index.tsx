import { Card,  Text,  Button,  Textarea, Divider } from "@mantine/core";
import styled from "styled-components";
import { Image, X } from "react-feather";
import { useRef, useState } from "react";

const SNewsIndex = styled.div`
  width: 100%;
  margin-top: 30px;
  height: 100%;
   overflow-y: auto;
   ::-webkit-scrollbar {
    display: none;
   }
`;

function NewsIndex() {
  const [selectedImage , setSelectedImage] = useState("")
  const [selectedImageName , setSelectedImageName] = useState("")
  const feedBackImageRef:any = useRef(null);

  function handleFeedBackImageChange(e:any){
    console.log(e.target.files[0])
    setSelectedImage(URL.createObjectURL(e.target.files[0]))
    setSelectedImageName(e.target.files[0].name)
  }

  function handleFeedBackImageInputClick(){
    feedBackImageRef.current.click();
  }

  return (
    <SNewsIndex>
      <Text italic size={"md"} style={{marginLeft:"5px", marginTop:"10px"}}>
           FeedBack
       </Text>
       <Divider my="sm" color={"black"} style={{ marginTop:"5px" }}/>
      <Card 
         shadow="sm" 
         p="lg" 
         radius="md" withBorder 
         style={{
           display : "flex",
           flexDirection : "column",
           alignItems : "center",
           position :"relative"
      }}>
         <Text size={"lg"}>
             Send Us Your Feedback
         </Text>
         <Textarea 
            style={{
              marginBottom : "10px",
              marginTop : "10px",
              width : "100%",
              fontSize : "25px"
            }}
            minRows = {6}     
            placeholder = "Every word of you impacts this website"
         />
         { selectedImage !== "" &&
           <div 
              style={{
                  width : "100%",
                  paddingLeft : "8px", 
                  paddingRight:"8px", 
                  display :"flex", 
                  justifyContent:"space-between",
                  alignItems:"center",
                  marginBottom:"5px",
                  overflow : "hidden",
              }}>
              <div style={{
                      whiteSpace : "nowrap",
                      overflow : "hidden",
                      textOverflow : "ellipsis",
                      width : "100%",
                      cursor : "pointer",
                      height:"16",
                      color : "blue",
                      textDecoration : "underline"
                    }}
                    onClick = {()=>{ window.open(selectedImage,"__blank")}}
              >
                 <p style={{fontSize:"15px",margin:"0px"}}>{selectedImageName}</p>
              </div>
              <X size={16} style={{marginLeft :"5px", cursor:"pointer"}} onClick={()=>{setSelectedImage("") ; setSelectedImageName("")}}/>
           </div>
         }
         <Button
           variant="filled"
         >
             Send FeedBack
         </Button>
         <Image 
            style={{
              position : "absolute",
              right : "20px",
              bottom : "20px",
              cursor : "pointer",
              display : `${selectedImage === "" ? "block":"none"}`
             }}
            size={"35px"}
            width = {"50px"}
            onClick = {handleFeedBackImageInputClick}
          />
          <input 
             type={"file"} 
             accept="image/*" 
             ref={feedBackImageRef} 
             style={{display:"none"}}
             onChange = {handleFeedBackImageChange}
          />
      </Card>
    </SNewsIndex>
  );
}

export default NewsIndex;
