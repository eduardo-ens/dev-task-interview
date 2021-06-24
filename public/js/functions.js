getTransactionsTable()
    function hideLoader() {
        const loader = document.querySelector(".loader");
        loader.className += " hidden"; // class "loader hidden"
    }
    
    async function getUsersContent() {

        try {
            const response = await fetch('http://localhost:4567/users')
            const data = await response.json()

            return data
        } catch (error) {
            console.log(error)
        }

    }

    async function getGroupsContent() {
        try {
            const response = await fetch('http://localhost:4567/API/groups')
            const data = await response.json()
            
            return data.groupInfoList
        } catch (error) {
            console.log(error)
        }
    }

    async function getAgreementsByUser(userId) {
        try {
            const response = await fetch('http://localhost:4567/API/agreements/user/' + userId)
            const data = await response.json()

            return data.userAgreementList
        } catch (error) {
            console.log(error)
        }
    }

    async function getUsersByGroup(groupId) {
        try {
            const response = await fetch('http://localhost:4567/API/usersByGroup/' + groupId)
            const data = await response.json()

            return data.userInfoList
        } catch (error) {
            console.log(error)
        }
    }

    
    async function getTransactionsTable() {
        console.log('It is taking about 30 seconds to load, please wait!')
        const groupIds = [] 

        let agreements
        let members
        let qtd

        let i = 0
        let j = 0

        const groups = await getGroupsContent()

        let output = `<tr>
                        <th>Email/Group</th>
                        <th>Agreement</th>
                    </tr>`

        for (let group of groups) {
            groupIds[i] = {
                id: `${group.groupId}`,
                name: `${group.groupName}`,
                groupAgreements: 0,
                users: '',
            }
            i++
        }

        i = 0
        for (let group of groups) {
            users = await getUsersByGroup(group.groupId)
            if (users != undefined) {
                groupIds[i].users = users      
            }
            i++
        }

        for (i = 0; i < groupIds.length; i++) {
            members = groupIds[i].users
            if (members != undefined) {
                for (j = 0; j < members.length; j++) {
                    agreements = await getAgreementsByUser(members[j].id)
                    if (agreements == undefined) {
                        qtd = 0
                    } else {
                        qtd = agreements.length
                    }

                    groupIds[i].groupAgreements += qtd
                    let newUser = Object.assign(members[j], {userAgreements: qtd})
                    groupIds[i].users[j] = newUser
                }
            }
        }

        for (groupId of groupIds) {
            output += ` <tr>
                        <td style='font-weight: bold'>${groupId.name}</td>
                        <td style='font-weight: bold'>total: ${groupId.groupAgreements}</td>
                        </tr>
                    `

            for (i = 0; i < groupId.users.length; i++) {
                output += ` <tr>
                            <td style='text-indent: 1.5em'>${groupId.users[i].email}</td>
                            `

                output += `
                            <td style='text-align: right'>${groupId.users[i].userAgreements}</td>
                            </tr>
                        `
            }
        }
        hideLoader()
        document.getElementById('usersTable').innerHTML = output
    }