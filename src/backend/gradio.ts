'use server'

import { Client } from '@gradio/client'
import { Hand } from '~/types/core'
if (!process.env.GRADIO_SERVER) {
    throw new Error('GRADIO_SERVER environment variable is not set')
}

const clientOptions: ConstructorParameters<typeof Client>[1] = {}
if (process.env.GRADIO_USERNAME && process.env.GRADIO_PASSWORD) {
    clientOptions.auth = [
        process.env.GRADIO_USERNAME,
        process.env.GRADIO_PASSWORD,
    ]
}

const client = new Client(process.env.GRADIO_SERVER, clientOptions)

type PredictResult = {
    [hand in Hand]: number
}

export async function predict(image: Blob): Promise<PredictResult> {
    const res = await client.predict('/predict_image_api', {
        image,
    })
    const data = res.data as [PredictResult]
    return data[0]
}
