import './Intialscreen.css'
const Intialscreen = (props) => {
  return( 
  <div className="noNotes">
    <div className='noNotes-subcontainer'>
      <p>You have no notes</p>
      <button class="button-55" role="button" onClick={props.addnewone}>Create One Now</button>
    </div>
  </div>
  )
}
export default Intialscreen