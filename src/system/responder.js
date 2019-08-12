export const Responder = {
  object: (data) => {
    return { data, success: true }
  },
  list: (data, offset, limit, total) => {
    return {
      data,
      pagination: { offset, limit, total },
      success: true
    }
  },
  successAck: () => {
    return {
      success: true
    }
  }
}