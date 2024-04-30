// REQUIRE
const abc = async (req, res, next) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
};

const errorHandling = async function (req, res, next) {
  try {
    await abc(req, res, next);
  } catch (err) {
    //
  }
};

errorHandling(req, res, next);

exports.createTour = catchAsync(fn);
