function evm(code) {
    const stack = [];
    let pc = 0;
  
    while (pc < code.length) {
      const opcode = code[pc];
      pc++;
      switch (opcode) {
        case 0x60: { // PUSH1
          stack.push(code[pc]);
          pc++;
          break;
        }
        case 0x61: { // PUSH2
          stack.push(code[pc] + (code[pc + 1] << 8));
          pc += 2;
          break;
        }
        case 0x62: { // PUSH3
          stack.push(code[pc] + (code[pc + 1] << 8) + (code[pc + 2] << 16));
          pc += 3;
          break;
        }
        case 0x63: { // PUSH4
          stack.push(code[pc] + (code[pc + 1] << 8) + (code[pc + 2] << 16) + (code[pc + 3] << 24));
          pc += 4;
          break;
        }
        case 0x64: { // PUSH5
          stack.push(code[pc] + (code[pc + 1] << 8) + (code[pc + 2] << 16) + (code[pc + 3] << 24) + (code[pc + 4] << 32));
          pc += 5;
          break;
        }
      }
    }
    return { stack };
  }