"use server"

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

const client = await Client.connect(process.env.GRADIO_SERVER, clientOptions);

type PredictResult = {
    [hand in Hand]: number
}

export async function predict(image: string): Promise<PredictResult> {
    const res = await fetch(image);
    const blob = await res.blob();
    const response = await client.predict('/predict_image_api', {
        image: blob
    })
    const data = response.data as [PredictResult]
    return data[0]
}
