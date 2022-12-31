

// const Text = () => {
//   return (
//     <div>
//         <div>
//       <text style={{"display":"block","width":"100%","borderRadius":"2%", "border":"2px solid blue"}} name="aboutus" id="aboutus"  readOnly cols="30" rows="10">This is about us</text>
//         </div>
//     </div>
//   )
// }

// export default Text
import React from 'react'

export default function Text() {
  return (
    <div>
      <Text style={{"display":"block","width":"100%","borderRadius":"2%", "border":"2px solid blue"}} name="aboutus" id="aboutus"  readOnly cols="30" rows="10">This is about us</Text>
    </div>
  )
}
