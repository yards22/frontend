import { Select } from '@mantine/core'
import { useState } from 'react'
import { ArrowDown, ArrowUp } from 'react-feather'
import UserLikedPosts from './LikedPosts'
import UserPosts from './UserPosts'

const postsSubSections = [
    { value: 'allPosts', label: 'All Posts' },
    { value: 'likedPosts', label: 'Liked Posts' },
]

function PostsSectionIndex() {
    const [selectedTypeOfPosts,setSelectedTypeOfPosts] = useState("allPosts")
    const [currentActivePostsSubSection,setCurrentActivePostsSubSection] = useState("All Posts")
    const [sortByNewFirst,setSortNewFirst] = useState(true)

    function handlePostsSubsectionDropDownChange(e:any){
        setSelectedTypeOfPosts(e)
        const x = postsSubSections.find((y:any)=>y.value === e)
        if(x) setCurrentActivePostsSubSection(x?.label)
    }
    return (
        <div
        style={{
            display : "flex",
            flexDirection : "column",
            width : "100%",
            //  border : "1px solid black",
            marginTop : "18px",
            padding : "8px",
        }}
        >
            <div
            style={{
                display : "flex",
                width : "100%",
                justifyContent : "center",
                alignItems : "center",
                position : "relative",
                marginBottom : "10px"
            }}
            >
                <Select
                    placeholder="Pick one"
                    data={postsSubSections}
                    value = {selectedTypeOfPosts}
                    style = {{
                        position : "absolute",
                        left : "0px",
                        width : "120px"
                    }}
                    onChange={(e:any)=>handlePostsSubsectionDropDownChange(e)}
                />
                {currentActivePostsSubSection}
                <div
                  style={{
                    position : "absolute",
                    right : "0px",
                    cursor : "pointer",
                    display : 'flex',
                    alignItems : "center"
                  }}
                  onClick = {()=>{
                    setSortNewFirst(!sortByNewFirst)
                  }}
                >   
                    Posts Date 
                    { sortByNewFirst && <ArrowUp size={"18"} style={{ marginLeft : "5px" }}/> }
                    { !sortByNewFirst && <ArrowDown size={"18"} style={{ marginLeft : "5px" }}/>}
                </div>
            </div>
            {selectedTypeOfPosts === "allPosts" && <UserPosts/>}
            {selectedTypeOfPosts === "likedPosts" && <UserLikedPosts/> }
        </div>
    )
}

export default PostsSectionIndex