const {
        createVisualisation,
        vArray,
        vElement,
        mergeSort,
        bubbleSort,
        insertionSort,
        selectionSort,
        linearSearch,
        binarySearch,
} = window.VisualDS;

window.handleVIsualisation = function ( editor )
{
        document.getElementById( "run-btn" ).addEventListener( "click", () =>
        {
                const userCode = editor.getValue();
                const userScript = new Function( [ "controller" ], userCode );
                createVisualisation( "visualization-canvas", userScript );
        } );
}

