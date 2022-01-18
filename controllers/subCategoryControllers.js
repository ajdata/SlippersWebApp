const SubCategory = require("../models/SubCategory");
const slugify = require("slugify");

const subCategoryControllers = {
  createSubCategory: async (req, res) => {
    try {
      const { name, parent } = req.body;
      const subCategory = await new SubCategory({
        name,
        parent,
        slug: slugify(name),
      }).save();
      res.json(subCategory);
    } catch (err) {
      // console.log(err)
      res.status(400).send("Create sub category failed");
    }
  },
  listSubCategory: async (req, res) => {
    res.json(await SubCategory.find({}).sort({ createdAt: -1 }).exec());
  },
  readSubCategory: async (req, res) => {
      console.log(req.params)
    let subCategory = await SubCategory.findOne({
      slug: req.params.slug,
    }).exec();
    res.json(subCategory);
  },
  removeSubCategory: async (req, res) => {
    try {
      const deleted = await SubCategory.findOneAndDelete({
        slug: req.params.slug,
      });
      res.json(deleted);
    } catch (err) {
      res.status(400).send("Delete sub category failed");
    }
  },
  updateSubCategory: async (req, res) => {
    const { name, parent } = req.body;
    try {
      const updated = await SubCategory.findOneAndUpdate(
        { slug: req.params.slug },
        { name, parent, slug: slugify(name) },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(400).send("Update sub category failed");
    }
  },
  getSubcategoryByParent: async(req,res)=>{
      try{
          const subCategories = await SubCategory.find({parent:req.params.parentId}).exec()
          res.json(subCategories)



      }catch(e){
        res.status(400).send("Cannot find subcategory with that id" + req.params.parentId);
      }
  }
};

module.exports = subCategoryControllers;
