import useDocumentTitle from "src/hooks/useDocumentTitle";

function Kategori(props){
    useDocumentTitle(props.title);

    return (
    <>
        <div className="container mt-20 mx-auto">
            <div className="text-center">
                {props.title}
            </div>
        </div>
    </>
    )
}

export default Kategori;