
import Markdown from "react-markdown";
import './Preview.css'

const Preview=(props)=>{
    return <div class="previewData">
        <Markdown>{props.data}</Markdown>
    </div>
}
export default Preview;