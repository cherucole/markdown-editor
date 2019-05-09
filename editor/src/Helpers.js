import shortid from "shortid";

export const generateId = () => shortid()

const data = {"blocks":[{"key":"1la1e","text":"thi wil contain bold","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":16,"length":4,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"5bl2j","text":"thi wil contain italic","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":16,"length":6,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"9sen6","text":"thi wil contain underline","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":16,"length":9,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"a11h3","text":"thi wil contain bold italic","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":16,"length":4,"style":"BOLD"},{"offset":21,"length":6,"style":"BOLD"},{"offset":21,"length":6,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"3g7tj","text":"thi wil contain bold underline","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":16,"length":4,"style":"BOLD"},{"offset":21,"length":9,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"o4sp","text":"thi wil contain italic underline","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":16,"length":6,"style":"BOLD"},{"offset":23,"length":9,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"dtmbt","text":"thi wil contain bold italic underline","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":16,"length":4,"style":"BOLD"},{"offset":21,"length":6,"style":"ITALIC"},{"offset":28,"length":9,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"596kp","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8jtu1","text":"combine bolditalic","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":8,"length":10,"style":"BOLD"},{"offset":12,"length":6,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"86phc","text":"combine boldunderline","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":8,"length":13,"style":"BOLD"},{"offset":12,"length":9,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"69jv4","text":"combine italicunderline","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":8,"length":6,"style":"ITALIC"},{"offset":14,"length":9,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"kpe8","text":"combine bolditalicunderline","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":8,"length":4,"style":"BOLD"},{"offset":12,"length":6,"style":"ITALIC"},{"offset":18,"length":9,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"292du","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6g2mu","text":"test ","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"a2fp3","text":"asdasdasda s","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":12,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"4u38f","text":"asd asd","type":"unordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":7,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"28gr5","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2tjri","text":"test ","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"8oduf","text":"asda sd","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":7,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"dtld2","text":"asdasdd ","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":8,"style":"UNDERLINE"}],"entityRanges":[],"data":{}},{"key":"dhfar","text":"asd dasd asd","type":"ordered-list-item","depth":0,"inlineStyleRanges":[{"offset":0,"length":12,"style":"UNDERLINE"},{"offset":4,"length":4,"style":"ITALIC"},{"offset":10,"length":2,"style":"BOLD"}],"entityRanges":[],"data":{}}],"entityMap":{}}

const BLOCK_TYPES = {
  TEXT: 'text',
  HEADING1: 'heading1',
  HEADING2: 'heading2',
  HEADING3: 'heading3',
  BLOCKQUOTE: 'blockquote',
  BULLETS: 'bullets',
  NUMBERS: 'numbers',
  NUMBERS: 'numbers',
}

const getBlockType = type => {
  if (type === 'unordered-list-item') {
    return BLOCK_TYPES.BULLETS
  }
  
  if (type === 'ordered-list-item') {
    return BLOCK_TYPES.NUMBERS
  }
  
  return BLOCK_TYPES.TEXT
}

const parseRow = block => {
  const {text, inlineStyleRanges, type} = block

  if(!text || !text.length) {
    return { row: [ { text: '' } ], type: getBlockType(type), text: '' }
  }
  const result = []

  let styleOffsets = []

  inlineStyleRanges.forEach(inlineStyleRange => {
    styleOffsets.push(inlineStyleRange['offset'])
    styleOffsets.push(inlineStyleRange['length'] + inlineStyleRange['offset'])
  })

  styleOffsets = styleOffsets.filter((item, pos) => {
    return styleOffsets.indexOf(item) == pos; 
  });
  

  styleOffsets.sort((a, b) => a - b)

  const firstIndex = styleOffsets[0]
  if(firstIndex > 0) {
    const item = {
      text: text.substring(0, firstIndex),
    }
    result.push(item)
  }

  styleOffsets.forEach((a, index) => {
    const b = styleOffsets[index+1]
    if(b) {
      const item = {
        // text: text.substring(a, b),
        styles: []
      }

      inlineStyleRanges.forEach(inlineStyleRange => {
        const start = inlineStyleRange['offset']
        const end = inlineStyleRange['length'] + inlineStyleRange['offset']

        if(start >= a && b <= end ) {
          item.text = text.substring(a, b)
          item.range = [a, b]
          if(inlineStyleRange.style) {
            item.styles.push(inlineStyleRange.style)
          }
        }
      })

      result.push(item)
    }
  })

  const lastIndex = styleOffsets[styleOffsets.length-1]
  if(lastIndex < text.length) {
    const item = {
      text: text.substring(lastIndex, text.length),
    }
    result.push(item)
  }

  return { row: result, text, type: getBlockType(type) }
}

export const convertFromRaw = () => {
  const { blocks } = data

  const result = []

  blocks.forEach(block => {
    const { row, text, type } = parseRow(block)
    result.push({ id: generateId(), type, value: text, blocks: row })
  })


  // console.log(result)

  return result
}

export const convertToRaw = (data) => {
  const result = { blocks: [], entityMap: {} }

  const sample = {
    key: '1la1e',
    text: '',
    type: 'unstyled',
    depth: 0,
    inlineStyleRanges: [],
    entityRanges: [],
    data: {},
  }

  data.forEach(item => {
    // console.log(item)
    // const { row, text, type } = parseRow(item)
    // result.push({ id: generateId(), type, value: text, blocks: row })

    const row = {
      ...sample,
      key: generateId(),
      text: item.value,
    }

    result.blocks.push(row)
  })

  // console.log(JSON.stringify(result))

  return result
}

export const getCurrentBlockInRow = ({ selection, row, cursorAt = null }) => {
  const rowCursorAt = cursorAt !== null ? cursorAt : selection.start

  let currentBlock = {}
  let blockIndex = null
  let pointerAt = null

  // if (selection.start === selection.end) {

    if(row && row.value && ( rowCursorAt === 0 || rowCursorAt === 1 )) {
      // console.log("First block:", rowCursorAt)
      
      blockIndex = 0
      pointerAt = rowCursorAt
      currentBlock = row[0]

    } else if (row && row.value) {
      const beforePointerText = row.value.substring(0, rowCursorAt)
      
      // console.log("beforePointerText::", beforePointerText, cursorAt)
      
      const { blocks = [] } = row
      let blockTexts = ""


      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        blockTexts += block.text

        // How are yo|u man?
        // [How ][are ][yo|u ][man?]
        // Block: 3, i: 2, index: 10

        if(blockTexts.length >= beforePointerText.length) {
          const blockStyles = block.styles || []
          
          currentBlock = block
          blockIndex = i
          // pointerAt = blockTexts.length - beforePointerText.length

          // if(pointerAt > rowCursorAt) {
          //   pointerAt = rowCursorAt
          // }

          const afterBlockLength = blockTexts.length - beforePointerText.length
          
          const actual = block.text.length - afterBlockLength // > pointerAt
            // ? block.text.length - afterBlockLength - pointerAt
            // : block.text.length - afterBlockLength
          
          // pointerAt = block.text.length - afterBlockLength
          pointerAt = actual

          // console.log(blockTexts.length - beforePointerText.length, block.text.length - afterBlockLength);
          

          // console.log("pointerAt::", blockTexts.length - beforePointerText.length, "--At", pointerAt)

          // this.emitActiveStyles({ activeStyles: blockStyles })
          // console.log("Active block::", i)
          // console.log("Active block::", i, "blockTexts::", "[",blockTexts,"]", "beforePointerText::", "[",beforePointerText,"]", "pointerAt::", pointerAt, "selection.start::", selection.start)

          console.tron.display({
            name: 'getCurrentBlockInRow',
            value: { 
              ["Active block::"]: i,
              ["blockTexts::"]: blockTexts,
              ["beforePointerText::"]: beforePointerText,
              ["pointerAt::"]: pointerAt,
              ["actual::"]: actual,
              ["selection::"]: selection,
              ["length-1"]: blockTexts.length - beforePointerText.length,
              afterBlockLength: afterBlockLength,
              ["block.text.length"]: block.text.length
            },
          })

          break;
        }
      }
    }
  // }

  return { block: currentBlock, blockIndex, pointerAt }
}

export const getSelectedBlocks = ({ selection, row }) => {
  const { start = 0, end } = selection
  const startBlock = getCurrentBlockInRow({ row, cursorAt: start })
  const endBlock = getCurrentBlockInRow({ row, cursorAt: end })
  return { startBlock, endBlock }
}

export const splitString = (value = '', index) => [value.substring(0, index) , value.substring(index)]

export const attachStylesToSelected = ({ selection, row, newStyles }) => {
  const { startBlock, endBlock } = getSelectedBlocks({ selection, row })

  const { blocks } = row

  let selectedText = ''

  const newBlocks = []

  for (let i = 0; i < blocks.length; i++) {
    if(i >= startBlock.blockIndex && i <= endBlock.blockIndex) {
      const block = blocks[i];
      const { text } = block

      let blockText = text
      
      if (startBlock.blockIndex === endBlock.blockIndex) {
        const blockPrevText = text.substring(0, startBlock.pointerAt)
        const blockSelectedText = text.substring(startBlock.pointerAt, endBlock.pointerAt)
        const blockNextText = text.substring(endBlock.pointerAt, text.length)
        
        console.log("Same blog", blockSelectedText, startBlock.pointerAt, endBlock.pointerAt)
        
        const { styles: currentStyles = [] } = block
        
        const prevBlock = { text: blockPrevText, styles: currentStyles }
        const newBlock = { text: blockSelectedText, styles: [ ...currentStyles, ...newStyles ] }
        const nextBlock = { text: blockNextText, styles: currentStyles }

        newBlocks.push(prevBlock)
        newBlocks.push(newBlock)
        newBlocks.push(nextBlock)

      } else if(i === startBlock.blockIndex) {
        textParts = splitString(text, startBlock.pointerAt)
        const { styles: currentStyles = [] } = block
        const prevBlock = { text: textParts[0], styles: currentStyles }
        const newBlock = { text: textParts[1], styles: [ ...currentStyles, ...newStyles ] }
        newBlocks.push(prevBlock)
        newBlocks.push(newBlock)
      } else if (i === endBlock.blockIndex) {
        blockText = text.substring(0, endBlock.pointerAt)
        textParts = splitString(text, endBlock.pointerAt)
        const { styles: currentStyles = [] } = block
        const newBlock = { text: textParts[0], styles: [ ...currentStyles, ...newStyles ] }
        const nextBlock = { text: textParts[1], styles: currentStyles }
        newBlocks.push(newBlock)
        newBlocks.push(nextBlock)
      } else {
        blockText = text
        const { styles: currentStyles = [] } = block
        const newBlock = { text: text, styles: [ ...currentStyles, ...newStyles ] }
        newBlocks.push(newBlock)
      }

      selectedText += blockText
    }
  }

  let p1 = blocks.slice(0, startBlock.blockIndex)
  let p2 = blocks.slice(endBlock.blockIndex+1)

  // if (startBlock.blockIndex === endBlock.blockIndex) {
    
  // }

  const data = [...p1, ...newBlocks, ...p2]

  console.tron.display({
    name: 'data',
    value: { p1, newBlocks, p2 },
  })

  // blocks.splice(startBlock.blockIndex, endBlock.blockIndex-startBlock.blockIndex+1);

  console.tron.display({
    name: 'newBlocks',
    value: { newBlocks, selectedText, blocks, data, startBlock, endBlock  },
  })


  return { blocks: data }
}

export const removeSelectedText = ({ selection, row }) => {
  const { blocks = [] } = row
  const { startBlock, endBlock } = getSelectedBlocks({ selection, row })

  console.tron.display({
    name: 'removeSelectedText',
    value: { startBlock, endBlock  },
  })

  const newBlocks = []

  let p1 = blocks.slice(0, startBlock.blockIndex)
  let p2 = blocks.slice(endBlock.blockIndex+1)

  for (let i = 0; i < blocks.length; i++) {
    if(i >= startBlock.blockIndex && i <= endBlock.blockIndex) {
      const block = blocks[i];

      const { text, styles: currentStyles = [] } = block

      let blockText = text
      
      if (startBlock.blockIndex === endBlock.blockIndex) {
        const blockPrevText = text.substring(0, startBlock.pointerAt)
        const prevBlock = { text: blockPrevText, styles: currentStyles }
        newBlocks.push(prevBlock)
      } else if(i === startBlock.blockIndex) {
        textParts = splitString(text, startBlock.pointerAt)
        const { styles: currentStyles = [] } = block
        const prevBlock = { text: textParts[0], styles: currentStyles }
        newBlocks.push(prevBlock)
      } else if (i === endBlock.blockIndex) {
        blockText = text.substring(0, endBlock.pointerAt)
        textParts = splitString(text, endBlock.pointerAt)
        const { styles: currentStyles = [] } = block
        const nextBlock = { text: textParts[1], styles: currentStyles }
        newBlocks.push(nextBlock)
      } else {
      //   blockText = text
      //   const { styles: currentStyles = [] } = block
      //   const newBlock = { text: text, styles: [ ...currentStyles, ...newStyles ] }
        // newBlocks.push(newBlock)
      }

      // selectedText += blockText
    }
  }

  if (startBlock.blockIndex === endBlock.blockIndex) {
    console.log("Deleted one character")
  }

  const data = [...p1, ...newBlocks, ...p2].filter(i => !!i.text)

  return data
}

export const insertAt = (main_string, ins_string, pos) => {
  if(typeof(pos) == "undefined") {
   pos = 0;
 }
  if(typeof(ins_string) == "undefined") {
   ins_string = '';
 }
  return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}