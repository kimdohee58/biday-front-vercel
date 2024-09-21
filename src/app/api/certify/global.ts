"use client";

import type { NextApiRequest, NextApiResponse } from 'next';
// @ts-ignore
import fetch from 'node-fetch';

export default async function getNiceCertify(req: NextApiRequest, res: NextApiResponse) {
    const reqData = Object.keys(req.query).length ? req.query : req.body;

    const { enc_data: encData, token_version_id: tokenVersionId } = reqData as {
        enc_data: string;
        token_version_id: string;
    };

    const response = await fetch('https://nice.example.com/nice/decode', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            encData,
            tokenVersionId,
        }),
    });

    const result = await response.json();

    if (response.ok && result) {
        res.redirect(302, `/certify/?reqNo=${result.requestno}`);
        return;
    }
    res.redirect(302, `/certify/?error=${response.status}`);
}
