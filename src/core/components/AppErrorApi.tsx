

type AppErrorApiProps = {
    error?: Error | null;
};

export const AppErrorApi: React.FC<AppErrorApiProps> = ({error}) => {

    let message: string ='';

    if(!error){
        return (
            <>
            </>
        );
    }

    const er = Reflect.has(Reflect.get(error, 'response') ?? {}, 'data') ? Reflect.get(Reflect.get(error, 'response'), 'data') : undefined;
    
    message = er?.message || error.message;


    return (
        <>
                <p>
                    {message}
                </p>
        </>
    );
};