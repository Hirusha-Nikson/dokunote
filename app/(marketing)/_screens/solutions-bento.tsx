"use client";

const SolutionsBento = () => {
    return ( 
        <div className="w-full mx-auto border min-h-screen">
            {/* grid 1 */}
            <div className="grid grid-cols-5 w-full gap-4">
                <div>1</div>

                <div className="col-span-2 border">
                    <div>
                        <h1 className="text-3xl font-bold">Why Dokunote?</h1>
                    </div>
                </div>

                <div>
                    <div className="grid grid-rows-3 gap-2 justify-between border">
                        <div>3-1</div>
                        <div>3-2</div>
                        <div>3-3</div>
                    </div>
                </div>
                <div>4</div>
            </div>
        </div>

     );
}
 
export default SolutionsBento;