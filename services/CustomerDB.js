class Customer {
            constructor(client, { id, name, lastname, email, role, phone, password, active, orgId }) {
                        this.client = client
                        this.id = id
                        this.email = email
                        this.name = name
                        this.lastname = lastname
                        this.role = role
                        this.password = password
                        this.active = active
                        this.orgId = orgId
                        this.usecase;
            }

            static async Build(client, [id, name, lastname, email, role, phone, password, active, orgid]) {
                        let customer = new Customer(client, { id, name, lastname, email, role, phone, password, active, orgId })
                        if (id) {
                                    await customer.Init(id)
                        } else if (email) {
                                    await customer.Init(null, email)
                        }

                        return customer
            }


            async Init(id = null, email = null) {
                        let result;
                        if (id) {
                                    let queryString = `Select * FROM customer WHERE id = $1`;
                        } else if (email) {
                                    let queryString = `Select * FROM customer WHERE email = $1`;
                        }
                        if (result.rowCount == 0) {
                                    delete this.id
                                    return this
                        }


                        this.id = result.rows[0].id
                        this.name = result.rows[0].name
                        this.lastname = result.rows[0].last_name
                        this.email = result.rows[0].email
                        // this.phone = result.rows[0].phone
                        this.isAdmin = result.rows[0].is_admin
                        this.role = result.rows[0].role_id
                        this.password = result.rows[0].password
                        this.sal = result.rows[0].sal
                        this.active = result.rows[0].active
                        this.created = result.rows[0].created
                        let query = `Select organization_id from organization_customer where customer_id = $1`
                        let result_ = await this.client.query(query, [this.id])

                        this.orgid = this.orgId = result_.rows[0].organization_id
                        let queryResultUsecase = await this.client.query('Select uc_is from organization_customer oc JOIN org_usecase ou ON oc.organization_id = ou.org_id WHERE customer_id = $1', [this.id])
                        console.log(queryResultUsecase.rows);
                        if (queryResultUsecase.rows.length >= 0) {
                                    console.log('Have a use case', queryResultUsecase.rows[0].uc_is);
                                    this.usecase = queryResultUsecase.rows[0].uc_is;
                        } else {
                                    this.usecase = 'sr'
                        }
            }
}