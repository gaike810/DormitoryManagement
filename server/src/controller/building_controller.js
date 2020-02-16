const { Building } = require("../model")

module.exports = {
  getStudents: async function(buildingId) {
    const FloorController = require("./floor_controller")
    let users = []
    const building = await Building.findOne({ where: { id: buildingId } })
    const floors = await building.getFloors()
    for (let floor of floors) {
      const floorId = floor.id
      users = [...users, ...(await FloorController.getStudents(floorId))]
    }
    return users
  }
}
