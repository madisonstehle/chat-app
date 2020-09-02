'use strict';

const express = require('express');

const router = express.Router();


router.get('/', (req, res) => {})

router.get('/:roomID', (req, res) => {})

router.post('/initiate', (req, res) => {})

router.post('/:roomID/message', (req, res) => {})

router.put('/:roomID/mark-read', (req, res) => {})


export default router;