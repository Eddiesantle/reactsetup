import {findTenantBySlug} from '../../../services/tenants'
import {findLinkBySlug} from '../../../services/link'

const GoPage = (props:any) =>{
    return <pre>{JSON.stringify(props,null,2)}</pre>
}

export default GoPage

export const getServerSideProps = async (context) => {

    const slug = context.params.pseudoLocale
    let tenant = null

    if(slug.indexOf('.') < 0){
        tenant = await findTenantBySlug(context.params.slug)
        if(!tenant){
            return {
                notFound:true
            }

        }
    }

    const link = await findLinkBySlug(tenant?.id, context.params.link)
    if(!link){
        return {
            notFound:true
        }

    }

    // TODO:Tipo de redirecionamento
    return context.res.writeHead(301, {
        'Content-Type': 'text/plain',
        Location: 'http://multi-domain1.com:3301/app/home'
    }).end()
    // ...
    console.log(link)
 
    return {
        props: {
          ...context.params,
          tenant,
          link
        },
        
    }
}

