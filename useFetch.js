import { useEffect, useRef, useState } from "react"

export const useFetch = ( url ) => {

    const isMounted = useRef(true);
    const [state, setState] = useState({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        
        return () => {
            isMounted.current = false;
        }

    }, [])

    useEffect(() => {

        setState({
            data: null,
            loading: true,
            error: null
        })

        fetch( url )
            .then( rsp => rsp.json() )
            .then( data => {

                if( isMounted.current ){
                    setState({
                        loading: false,
                        error: null,
                        data
                    });
                }else{
                    console.log('setState was not called')
                }

            })
            .catch( () => {
                setState({
                    data: null,
                    loading: false,
                    error: 'The info could not be loaded'
                });
            });

    }, [url])

    return state;

}
