import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<String>
) {
    const { query } = req
    let { fileName, content } = query

    try {
        const response = await fetch(`${process.env.DOT_NET_BACKEND_URL}/BlobStorage?fileName=${fileName}&content=${content}`, {
            method: "POST"
        })
        return res.status(200).json(await response.text())
    } catch (error) {
        console.error(error);
        return res.status(500)
    }
}
