const Sequelize = require('sequelize');

class Product extends Sequelize.Model {
    static initiate(sequelize){
        Product.init({
            name : {
                type : Sequelize.STRING(20),
                allowNull: false,
            },
            price : {
                type : Sequelize.INTEGER,
                allowNull: false,
            },
            stock : {
                type : Sequelize.INTEGER,
                allowNull: false,
            },
            main_image : {
                type : Sequelize.STRING(50), 
                allowNull: false,
            },
            category : {
                type : Sequelize.STRING(20),
                allowNull: false,
            },
            description : {
                type : Sequelize.TEXT,
                allowNull: false,
            },
            product_type: {
                type : Sequelize.STRING(20),
                allowNull: false,
            },
        },{
            sequelize,
            //????  timestamps: true,
            modelName:'Product', // sequelize의 객체로 사용될 모델 이름
            tablename:'products', // 실제 mysql에서 쓰이는 실제 데이터테이블 이름
            //????  paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        })
    }
    static associate(db){
        db.Product.belogsTo(db.Origin, {foreignKey : 'origin_id', targetkey: 'id'}),
        db.Product.belogsTo(db.Manufacturer, {foreignKey : 'manufacturer_id', targetkey: 'id'})
    }
}

module.exports = Product;