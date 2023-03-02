import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<String>
) {
    const { query } = req
    const { name } = query
    try {
        const response = await fetch(`${process.env.AZURE_FUNCTION_URL}/api/HelloWorld?name=${name || ''}`)
        return res.status(200).send(await response.text())
    } catch (error) {
        console.error(error);
        return res.status(500)
    }
}
